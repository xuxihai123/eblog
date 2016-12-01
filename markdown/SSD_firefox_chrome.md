### linux use SSD

1. firefox

在地址栏中输入 about:config 后回车，然后点击右键新建一个 String ，
name 为 browser.cache.disk.parent_directory ， value 为 /dev/shm/firefox

browser.cache.disk.parent_directory=/dev/shm/firefox

2. chrome

Chrome 则更加简单，只需要在启动快捷键里加一个参数就可以了 – -disk-cache-dir="/dev/shm/chrome/" 即可。

/opt/google/chrome/google-chrome --disk-cache-dir="/dev/shm/chrome/"

3. home mount on hdd