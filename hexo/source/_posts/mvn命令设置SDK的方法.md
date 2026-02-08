---
layout: post
title: mvn命令设置SDK的方法
date: 2026-02-08 20:42:48
tags:
---

按如下脚本实现：
```bash
#!/bin/bash
# Maven 编译脚本 - 指定 JDK 路径
# 使用方法: ./build.sh [JDK路径]
# 示例: ./build.sh /usr/lib/jvm/java-17-openjdk-amd64

JDK_PATH=${1:-/usr/lib/jvm/java-17-openjdk-amd64}  # 默认路径

# 检查 JDK 是否存在
if [ ! -d "$JDK_PATH" ]; then
    echo "错误: JDK 不存在于路径: $JDK_PATH"
    echo "请检查路径是否正确"
    exit 1
fi

if [ ! -f "$JDK_PATH/bin/javac" ]; then
    echo "错误: 找不到 javac 命令: $JDK_PATH/bin/javac"
    exit 1
fi

echo "========================================"
echo "使用 JDK 路径: $JDK_PATH"
echo "========================================"

# 设置 JAVA_HOME
export JAVA_HOME="$JDK_PATH"

# 设置 PATH
export PATH="$JAVA_HOME/bin:$PATH"

# 验证 Java 版本
echo "验证 Java 版本:"
"$JAVA_HOME/bin/java" -version
if [ $? -ne 0 ]; then
    echo "错误: 无法执行 Java 命令"
    exit 1
fi

echo ""
echo "开始 Maven 编译..."
echo ""

# 执行 Maven 编译
mvn clean compile -Dmaven.compiler.release=17

# 如果需要打包，取消下面的注释
# mvn clean package -Dmaven.compiler.release=17

if [ $? -eq 0 ]; then
    echo ""
    echo "编译成功！"
else
    echo ""
    echo "编译失败！"
    exit 1
fi
```