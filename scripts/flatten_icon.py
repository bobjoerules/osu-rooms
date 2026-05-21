import sys
import os
from PIL import Image

def flatten_icon(bg_color_hex="#D73F09"):
    icon_path = "/Users/bobjoerules/OSU_Code/osu-room-rates/assets/images/icon.png"
    backup_path = "/Users/bobjoerules/OSU_Code/osu-room-rates/assets/images/icon_original_backup.png"

    if not os.path.exists(icon_path):
        print(f"Error: Icon not found at {icon_path}")
        return False

    try:
        # Load the original icon
        with Image.open(icon_path) as img:
            img_rgba = img.convert('RGBA')
            
            # Create a backup of the original if it doesn't already exist
            if not os.path.exists(backup_path):
                img_rgba.save(backup_path)
                print(f"Backed up original icon to: {backup_path}")
            
            # Create a solid background image with the specified hex color
            # Handle hex with or without '#'
            hex_clean = bg_color_hex.lstrip('#')
            r = int(hex_clean[0:2], 16)
            g = int(hex_clean[2:4], 16)
            b = int(hex_clean[4:6], 16)
            
            bg = Image.new("RGBA", img_rgba.size, (r, g, b, 255))
            
            # Composite the transparent icon onto the solid background
            flattened = Image.alpha_composite(bg, img_rgba)
            
            # Convert to RGB (fully opaque) to remove the alpha channel entirely
            final_img = flattened.convert("RGB")
            
            # Save it back to the original icon path
            final_img.save(icon_path, "PNG")
            print(f"Successfully flattened icon onto background {bg_color_hex}!")
            print(f"Saved to: {icon_path}")
            return True
            
    except Exception as e:
        print(f"An error occurred: {e}")
        return False

if __name__ == "__main__":
    color = "#D73F09"  # Default to OSU brand orange
    if len(sys.argv) > 1:
        color = sys.argv[1]
    
    flatten_icon(color)
