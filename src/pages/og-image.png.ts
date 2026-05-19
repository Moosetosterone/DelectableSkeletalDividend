import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  const root = process.cwd();
  const crestBuffer = readFileSync(
    path.join(root, 'public/assets/spotsylvania-rfc-crest.png')
  );
  const crestSrc = `data:image/png;base64,${crestBuffer.toString('base64')}`;

  const fontNormal = readFileSync(
    path.join(root, 'public/fonts/playfair-display-700.ttf')
  ).buffer as ArrayBuffer;
  const fontItalic = readFileSync(
    path.join(root, 'public/fonts/playfair-display-700-italic.ttf')
  ).buffer as ArrayBuffer;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: '#1E3D2E',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        children: [
          {
            type: 'img',
            props: { src: crestSrc, width: 150, height: 150, style: { marginBottom: '16px' } },
          },
          {
            type: 'div',
            props: {
              style: { width: '60px', height: '2px', background: '#B89A4A', marginBottom: '14px' },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                fontStyle: 'italic',
                fontSize: '68px',
                color: '#B89A4A',
                lineHeight: 1,
                marginBottom: '6px',
              },
              children: 'Spotsylvania',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                fontSize: '38px',
                color: '#F6F2E6',
                lineHeight: 1,
                marginBottom: '22px',
              },
              children: 'Rugby Football Club',
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: '16px', color: '#B89A4A', letterSpacing: '0.22em' },
              children: 'JOIN THE FOUNDING LIST · EST. 2026',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Playfair Display', data: fontNormal, weight: 700, style: 'normal' },
        { name: 'Playfair Display', data: fontItalic, weight: 700, style: 'italic' },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
