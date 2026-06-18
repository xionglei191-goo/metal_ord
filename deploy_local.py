import os
import subprocess
import paramiko

# Server Details
host = '192.168.31.246'
user = 'xionglei'
key_file = '/home/xionglei/.ssh/id_ed25519_sync'
remote_dir = '/home/xionglei/Applications/metal_ord'
port = 8081

print("1. Building the project locally...")
subprocess.run(['npm', 'run', 'build'], check=True)

print("2. Packaging dist folder and server.js...")
tar_file = 'dist.tar.gz'
subprocess.run(['tar', '-czf', tar_file, 'dist/', 'server.js'], check=True)

print("3. Connecting to 192.168.31.246 via SSH...")
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host, username=user, key_filename=key_file)

print("4. Uploading package via SFTP...")
sftp = client.open_sftp()
# Ensure remote directory exists
try:
    sftp.mkdir(remote_dir)
except IOError:
    pass  # Directory already exists or permission denied

remote_tar_path = f"{remote_dir}/{tar_file}"
sftp.put(tar_file, remote_tar_path)
sftp.close()

print("5. Extracting package and configuring PM2...")
node_bin_dir = '/home/xionglei/.nvm/versions/node/v24.13.1/bin'

# Commands to execute on the remote host
commands = [
    f"mkdir -p {remote_dir}",
    f"tar -xzf {remote_tar_path} -C {remote_dir}",
    f"rm -f {remote_tar_path}",
    # Restart the static server using PM2
    f"export PATH={node_bin_dir}:\$PATH; pm2 delete metal_ord 2>/dev/null || true",
    f"export PATH={node_bin_dir}:\$PATH; cd {remote_dir} && pm2 start server.js --name metal_ord",
    f"export PATH={node_bin_dir}:\$PATH; pm2 save"
]

for cmd in commands:
    print(f"Executing: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    stdout_content = stdout.read().decode().strip()
    stderr_content = stderr.read().decode().strip()
    if stdout_content:
        print(f"Stdout:\n{stdout_content}")
    if stderr_content:
        print(f"Stderr:\n{stderr_content}")

client.close()

# Cleanup local tar file
if os.path.exists(tar_file):
    os.remove(tar_file)

print(f"\nSuccessfully deployed to http://192.168.31.246:{port} !")
