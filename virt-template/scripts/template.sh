vm_id='9001'
cloud_image_url='https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img'
template_name='ubuntu-22.04-jammy'
storage_location='local-lvm'
scsihw='virtio-scsi-pci'
memory='2048'
cores='2'
download_name='jammy.img'
bridge='vmbr0'

# Cleanup
qm destroy ${vm_id}
rm -rf download

# Prepare image
wget ${cloud_image_url} -O ${download_name}
virt-customize --update -a ${download_name}
virt-customize --install qemu-guest-agent,cloud-init -a ${download_name} --truncate /etc/machine-id

# import image
qm create ${vm_id} --memory ${memory} --cores ${cores} --net0 virtio,bridge=${bridge} --name ${template_name}
qm importdisk ${vm_id} ${download_name} ${storage_location}
qm set ${vm_id} --scsihw ${scsihw} --scsi0 ${storage_location}:vm-${vm_id}-disk-0
qm set ${vm_id} --ide0 ${storage_location}:cloudinit
qm set ${vm_id} --boot c --bootdisk scsi0
qm set ${vm_id} --agent enabled=1
qm template ${vm_id}
