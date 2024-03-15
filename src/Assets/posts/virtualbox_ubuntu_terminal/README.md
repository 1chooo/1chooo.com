# Solution about the terminal not opening in Ubuntu launched by VirtualBox

這篇文章，將會分享一個小設定，以讓在 VirtualBox 裡面的 Ubuntu，可以正常開啟 Terminal。

## 問題
在 App Tray 點擊 Terminal 時，無法正常開啟 Terminal。

## 解決方法
1. 進入 `System Settings` > `Region & Language`
2. 把語言設定 English (Canada)
3. format 設定成 United States
4. 重新開機

這樣就可以正常開啟 Terminal 了。

This article will share a small configuration to enable the Terminal in Ubuntu running inside VirtualBox.

## Issue
When clicking on the Terminal in the App Tray, it fails to open.

## Solution
1. Go to `System Settings` > `Region & Language`.
2. Set the language to `English (Canada)`.
3. Set the format to `United States`.
4. Restart

After applying these settings, the Terminal should open successfully.

- [Can't open a terminal in Ubuntu 22.04, running in VirtualBox 7.0 on a Windows 11 host machine](https://superuser.com/questions/1749837/cant-open-a-terminal-in-ubuntu-22-04-running-in-virtualbox-7-0-on-a-windows-11)