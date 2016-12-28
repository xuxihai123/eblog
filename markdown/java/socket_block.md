[TOC]
### HTTPsocket阻塞解决
#### 测试类 main方法
```java
    public static void main(String[] args) {
        try {
            ServerSocket server = new ServerSocket(8080);
            while (true) {
                Socket client = server.accept();
                test1(client);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```
#### 你可以使用浏览器测试是否阻塞
1. 定长字符(1024字节读取，不够1024算读取完)
```java
    public static void test1(Socket client) throws IOException {
        InputStream is = client.getInputStream();
        byte[] buffer = new byte[1024];//如果是１０２４的倍数，怎么搞...
        while (true) {
            int flag = is.read(buffer);
            System.out.println(new String(buffer,0,flag,"UTF-8"));
            if (flag < 1024) {
                break;
            }
        }
        client.close();

    }
```
2. SocketTimeoutException+ socket.shutdownOutput
```java
    public static void test2(Socket client) throws IOException {
        client.setSoTimeout(500);
        BufferedReader br = new BufferedReader(new InputStreamReader(client.getInputStream()));
        try {
            String content = br.readLine();
            while (content != null) {
                System.out.println(content);
                content = br.readLine();
            }
        } catch (SocketTimeoutException e) {
            client.shutdownOutput();
        }
        client.close();
    }
```