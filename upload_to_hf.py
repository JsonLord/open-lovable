from huggingface_hub import HfApi
import os

# Get the Hugging Face token from the environment variable
hf_token = os.environ.get("HF_TOKEN")
if not hf_token:
    raise ValueError("HF_TOKEN environment variable not set")

repo_id = "Leon4gr45/openoperator"
repo_type = "space"

# Initialize the HfApi client
api = HfApi(token=hf_token)

# Upload the entire directory
api.upload_folder(
    folder_path=".",
    repo_id=repo_id,
    repo_type=repo_type,
    ignore_patterns=[".git/*", "node_modules/*", ".next/*", "upload_to_hf.py"] # ignore some files
)

print("Files uploaded successfully.")
