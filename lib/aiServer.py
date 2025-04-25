from pyngrok import ngrok

# Replace below with your own token from https://dashboard.ngrok.com/get-started/setup
ngrok.set_auth_token("2w8MQDFsPX8Yb5ViG14DfANwVbw_6Gvr2iPSYuBZ4rHiDd7Qa")
from flask import Flask, request, jsonify, send_file
from PIL import Image
from io import BytesIO
import torch
from diffusers import StableDiffusionImg2ImgPipeline
from pyngrok import ngrok
import os

# Load model
model_id = "dreamlike-art/dreamlike-anime-1.0"
pipe = StableDiffusionImg2ImgPipeline.from_pretrained(model_id)
pipe.to("cuda" if torch.cuda.is_available() else "cpu")

# Flask app
app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate():
    try:
        prompt = request.form.get("prompt", "Anime style portrait, soft cel-shading, clean lineart, smooth gradients, pastel tones, expressive eyes, lightly flushed cheeks, Ghibli-inspired suburban background, cinematic lighting, polished and elegant finish")
        image_file = request.files["image"]

        init_image = Image.open(image_file.stream).convert("RGB")
        init_image = init_image.resize((512, 512))

        result = pipe(prompt=prompt, image=init_image, strength=0.75, guidance_scale=7.5)
        gen_img = result.images[0]

        buffer = BytesIO()
        gen_img.save(buffer, format="PNG")
        buffer.seek(0)

        return send_file(buffer, mimetype="image/png")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Start server
public_url = ngrok.connect(5000)
print(" * Ngrok URL:", public_url)
app.run(port=5000)
