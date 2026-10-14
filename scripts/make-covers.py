#!/usr/bin/env python3
"""Genera las portadas uniformes de las tarjetas del home.

Para cada instituto elige su portada (un archivo con "portada" en el nombre, o el
primero de `general/`, o el primero disponible), la recorta al centro a una
relación fija (16:10) y la redimensiona a un tamaño común, guardando el resultado
en `Assets/images/portadas/<slug>.webp`.

Requiere Pillow:  python -m pip install pillow

Uso:
  python scripts/make-covers.py                 # usa los valores por defecto
  python scripts/make-covers.py --width 800 --height 500 --quality 80
"""

import argparse
import os
import sys

from PIL import Image

SRC_ROOT = os.path.join("Assets", "images", "institutos")
OUT_ROOT = os.path.join("Assets", "images", "portadas")
EXTS = (".webp", ".jpg", ".jpeg", ".png")


def find_cover(folder: str) -> str | None:
    candidates = []
    for dirpath, _dirs, files in os.walk(folder):
        for name in files:
            if name.lower().endswith(EXTS):
                candidates.append(os.path.join(dirpath, name))
    if not candidates:
        return None

    def score(path: str):
        name = os.path.basename(path).lower()
        is_portada = 0 if "portada" in name else 1
        in_general = 0 if os.sep + "general" + os.sep in path.lower() else 1
        return (is_portada, in_general, path.lower())

    return sorted(candidates, key=score)[0]


def center_crop(image: Image.Image, ratio: float) -> Image.Image:
    width, height = image.size
    if width / height > ratio:
        new_width = round(height * ratio)
        left = (width - new_width) // 2
        return image.crop((left, 0, left + new_width, height))
    new_height = round(width / ratio)
    top = (height - new_height) // 2
    return image.crop((0, top, width, top + new_height))


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera portadas uniformes para las tarjetas.")
    parser.add_argument("--width", type=int, default=800)
    parser.add_argument("--height", type=int, default=500)
    parser.add_argument("--quality", type=int, default=80)
    args = parser.parse_args()

    if not os.path.isdir(SRC_ROOT):
        print(f"Ruta no encontrada: {SRC_ROOT}")
        sys.exit(1)

    os.makedirs(OUT_ROOT, exist_ok=True)
    ratio = args.width / args.height

    count = 0
    for slug in sorted(os.listdir(SRC_ROOT)):
        folder = os.path.join(SRC_ROOT, slug)
        if not os.path.isdir(folder):
            continue
        source = find_cover(folder)
        if not source:
            print(f"  sin fotos: {slug}", file=sys.stderr)
            continue
        try:
            with Image.open(source) as image:
                image.load()
                if image.mode in ("RGBA", "LA") or (
                    image.mode == "P" and "transparency" in image.info
                ):
                    background = Image.new("RGB", image.size, (255, 255, 255))
                    background.paste(image.convert("RGBA"), mask=image.convert("RGBA").split()[-1])
                    image = background
                elif image.mode != "RGB":
                    image = image.convert("RGB")
                image = center_crop(image, ratio)
                image = image.resize((args.width, args.height), Image.LANCZOS)
                target = os.path.join(OUT_ROOT, f"{slug}.webp")
                image.save(target, "WEBP", quality=args.quality, method=6)
            count += 1
            print(f"  {slug}: {os.path.basename(source)} -> {args.width}x{args.height}")
        except Exception as exc:  # noqa: BLE001
            print(f"  omitido {slug}: {exc}", file=sys.stderr)

    print(f"{count} portadas generadas en {OUT_ROOT}")


if __name__ == "__main__":
    main()
