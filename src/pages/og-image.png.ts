import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

async function loadFont(family: string, weight: number, italic: boolean): Promise<ArrayBuffer> {
  const params = italic
    ? `${family.replace(/ /g, '+')}:ital,wght@1,${weight}`
    : `${family.replace(/ /g, '+')}:wght@${weight}`;
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${params}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0)' },
  }).then((r) => r.text());
  const url = css.match(/url\(([^)]+\.woff2)\)/)?.[1];
  if (!url) throw new Error(`Font not found: ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export const GET: APIRoute = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const crestBuffer = readFileSync(
    path.join(__dirname, '../../public/assets/spotsylvania-rfc-crest.png')
  );
  const crestSrc = `data:image/png;base64,${crestBuffer.toString('base64')}`;

  const [fontNormal, fontItalic] = await Promise.all([
    loadFont('Playfair Display', 700, false),
    loadFont('Playfair Display', 700, true),
  ]);

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
