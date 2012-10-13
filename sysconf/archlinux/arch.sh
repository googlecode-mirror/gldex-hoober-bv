#!/bin/bash
echo "en_US.UTF8 UTF-8
zh_CN.UTF8 UTF-8
zh_CN.GBK GBK
zh_CN.GB2312 GB2312
zh_CN.GB18030 GB18030" > /etc/locale.gen
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
echo "KEYMAP=us
FONT=
FONT_MAP=" > /etc/vconsole.conf
echo "Asia/Shanghai" > /etc/Shanghai
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc --utc
echo "virtio-net" > /etc/modules-load.d/virtio-net.conf
echo "arch.lwh" > /etc/hostname
echo "127.0.0.1   localhost.localdomain   localhost arch.lwh
::1         localhost.localdomain   localhost arch.lwh" > /etc/hosts
echo "nameserver 8.8.8.8
nameserver 8.8.4.4
search arch.lwh" > /etc/resolv.conf
mkinitcpio -p linux
pacman -Sy grub-bios
grub-install --target=i386-pc --recheck /dev/sda
cp /usr/share/locale/en\@quot/LC_MESSAGES/grub.mo /boot/grub/locale/en.mo
grub-mkconfig -o /boot/grub/grub.cfg
pacman -Syu
exit
umount /mnt/{boot,home,}
reboot