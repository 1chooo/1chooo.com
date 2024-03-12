# 如何在 MacOS 安裝 Java + vscode 開發組合環境

> "探索如何利用 Visual Studio Code 在 MacOS 上進行 Java 開發，體驗遠離 Eclipse，更簡潔、更高效的 Coding 之旅！"

在這篇文章中，我們會示範如何在 MacOS 上安裝 Java 開發環境，並且透過 Visual Studio Code 來開發 Java 程式，這樣我們可以脫離過去 eclipse 的開發環境，並且可以使用更簡潔的 vscode 來開發 Java 程式。

### 下載 Oracle JDK Development Kit

這次示範的是透過 Oracle JDK 來安裝 Java 開發環境，我們目前最新的 LTS 版本是 `21.0.2`，因為 LTS 至少會維護五年，所以我們選擇 LTS 版本來安裝。

可以透過以下連結來下載 Oracle JDK Development Kit: https://www.oracle.com/java/technologies/downloads/

![](./imgs/01_oracle.png)

> [!NOTE]
> 大家要挑選適合自己的版本，這裡我們選擇的是 macOS 版本。並且是 intel 版本的 (x64)，如果你的電腦是 M1 芯片的話，請選擇 M1 版本 (ARM64)。

### 安裝 Oracle JDK Development Kit

我是透過 DMG Installer 的方式來安裝 Oracle JDK Development Kit，接著就是一連串的點擊下一步，直到安裝完成。

![](./imgs/02_open_jdk_dmg.png)

![](./imgs/03_install.png)

![](./imgs/04_install.png)

![](./imgs/05_install.png)

![](./imgs/07_install.png)

![](./imgs/08_install.png)


在我們做了一連串的安裝動作後，我們可以在終端機中檢查我們的 Java 開發環境是否安裝成功，可以輸入以下指令來檢查：
```bash
$ which java
/usr/bin/java

$ java -version
java 21.0.2 2024-01-16 LTS
Java(TM) SE Runtime Environment (build 21.0.2+13-LTS-58)
Java HotSpot(TM) 64-Bit Server VM (build 21.0.2+13-LTS-58, mixed mode, sharing)

$ which javac
/usr/bin/javac

$ javac -version
javac 21.0.2
```

![env test results](./imgs/09_env_test.png)


### 安裝 Visual Studio Code Extension

我們在 Visual Studio Code 的 Extensions 中搜尋 `Java` 並安裝 `Extension Pack for Java`，同時會連帶把 `debugger` 的套件也一併安裝，這樣我們就可以在 vscode 中開發 Java 程式了。

![](./imgs/10_install_vscode_package.png)

在安裝好後我們就可以簡單測試 Java 是否可以正常運作，我們可以建立一個簡單的 `HelloWorld.java` 程式，並且執行看看。

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

我們可以透過右上角的 `Run` 按鈕來執行我們的程式，也可以在 `main` function 前面點擊 'Run' 按鈕來執行。

![](./imgs/11_hello_world.png)


能看到 `Hello, World!` 的字串印出來，代表我們的 Java 開發環境已經安裝完成了。

![](./imgs/12_demo.png)

後續還可以隨著自己的需求來安裝其他的套件，例如 `Spring Boot`、`Maven`、`Gradle` 等等，也是同樣可以設定到 VSCode 的 path 中，讓 VSCode 可以正確的找到這些套件。

祝大家都可以順利的安裝 Java 開發環境，並且可以順利的開發 Java 程式。


