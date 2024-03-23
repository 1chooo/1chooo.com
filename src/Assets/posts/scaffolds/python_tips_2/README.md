同學好，感謝你的補充！

沒錯 `f-string` 是個非常好用的表達方式，另外我也可以再提供一種 `f-string` 的用法，是跟 `docstring` 有關透過三個引號的方式 `'''` 或 `"""` 都可以，同時也可以搭配 `f-string` 變成 `f'''` 或 `f"""` 做使用，通常在 Prompt Engineering 中很常用到，因為通常字串都非常長！以下為示範：

```py
demo_string = """
Hello There

This is Hugo
"""

print(demo_string)
```

output:
```bash
Hello There

This is Hugo
```

可以看出連換行符號都不用打，當初怎麼寫就是怎麼 print

另外也示範一下 `f-string` 的用法：

```py
name = "Hugo"

demo_string = f"""
Hello There

This is {name}
"""

print(demo_string)
```

output:
```bash
Hello There

This is Hugo
```

這也是我常做使用的 string 操作！