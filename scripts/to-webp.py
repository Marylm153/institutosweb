#!/usr/bin/env python3
"""Convierte las fotos de los institutos a WebP para reducir el peso del sitio.

Requiere Pillow:  python -m pip install pillow

Uso:
  python scripts/to-webp.py                         # convierte Assets/images/institutos
  python scripts/to-webp.py Assets/images/institutos --max 1200 --quality 70

Convierte cada .jpg/.jpeg/.png a .webp (misma ruta, extensión .webp),
elimina el original y reporta el peso antes/después.
"""

import argparse
import os
import sys

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser(description="Convierte imágenes de institutos a WebP.")
    parser.add_argument("path", nargs="?", default="Assets/images/institutos", help="Carpeta a procesar.")
    parser.add_argument("--max", type=int, default=1200, help="Lado máximo en píxeles.")
    parser.add_argument("--quality", type=int, default=70, help="Calidad WebP (0-100).")
    args = parser.parse_args()

    if not os.path.isdir(args.path):
        print(f"Ruta no encontrada: {args.path}")
        sys.exit(1)

    before = after = count = 0
    for dirpath, _dirs, files in os.walk(args.path):
        for name in files:
            if not name.lower().endswith((".jpg", ".jpeg", ".png")):
                continue
            source = os.path.join(dirpath, name)
            target = os.path.splitext(source)[0] + ".webp"
            before += os.path.getsize(source)
            try:
                with Image.open(source) as image:
                    image.load()
                    width, height = image.size
                    scale = min(1.0, args.max / max(width, height))
                    if scale < 1.0:
                        image = image.resize(
                            (max(1, round(width * scale)), max(1, round(height * scale))),
                            Image.LANCZOS,
                        )
                    if image.mode in ("RGBA", "LA") or (
                        image.mode == "P" and "transparency" in image.info
                    ):
                        image = image.convert("RGBA")
                    elif image.mode != "RGB":
                        image = image.convert("RGB")
                    image.save(target, "WEBP", quality=args.quality, method=6)
                after += os.path.getsize(target)
                os.remove(source)
                count += 1
            except Exception as exc:  # noqa: BLE001
                print(f"  omitido {source}: {exc}", file=sys.stderr)

    print(f"{count} archivos · {before / 1048576:.1f} MB -> {after / 1048576:.1f} MB")


if __name__ == "__main__":
    main()
