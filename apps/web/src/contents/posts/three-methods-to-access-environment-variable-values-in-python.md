---
title: "Three methods to Access environment variable values in Python"
publishedAt: "2024-12-26"
category: Project
tags:
  - Python
  - Environment
  - Backend
  - python-dotenv
  - os.environ
  - os.getenv
summary: "In Python, you can access environment variables using the `os` module, which provides a property called `environ` that contains the environment variables. In this post, I will share with you three methods to access environment variable values in Python."
banner: /images/banner/posts/three-methods-to-access-environment-variable-values-in-python.png
alt: "Three methods to Access environment variable values in Python"
mathjax: false
---

Hi everyone! I'm Hugo. I am currently focusing on developing https://1chooo.com and backend applications with Python. And there is a scenario where I need to access environment variable values in Python. However, sometimes it works, sometimes it doesn't. So, I decided to write this post to share with you three methods to access environment variable values in Python. That way, you can easily access environment variables in your Python applications.

![Three methods to Access environment variable values in Python by Hugo](/images/banner/posts/three-methods-to-access-environment-variable-values-in-python.png)

Environment variables are `key-value` pairs created by the operating system. In Python, you can access these variables using the `os` module, which provides a property called `environ` that contains the environment variables.

Here are three methods to access environment variable values in Python:

- Using the [`os.environ`](https://docs.python.org/3/library/os.html#os.environ) property
- Using the [`os.getenv()`](https://docs.python.org/3/library/os.html#os.getenv) method
- Using the [`python-dotenv`](https://pypi.org/project/python-dotenv/) Package

## Method 1: Using the `os.environ` property

Access all environment variables using the `os.environ` property. The `os.environ` property returns a dictionary containing all the environment variables.

```python
import os

print(os.environ)
```

If you want to access a specific environment variable, you can use the `os.environ` property with the key of the environment variable you want to access.

```python
import os

# access environment variable
print(os.environ['1CHOOO_DOMAIN_NAME'])
```

result:

```bash
https://1chooo.com
```

You can also use the `get()` method to access environment variables. The `get()` method returns the value of the specified environment variable.

```python
print(os.environ.get('1CHOOO_DOMAIN_NAME', 'http://localhost:8000'))
```

## Method 2: Using the `os.getenv()` method

```python
import os

# access environment variable
print(os.getenv('1CHOOO_DOMAIN_NAME'))
```

result:

```bash
https://1chooo.com
```

## Method 3: Using the `python-dotenv` Package

The `python-dotenv` package allows you to load environment variables from a `.env` file into the `os.environ` property.

```bash
$ pip install python-dotenv
```

Now, you can create a `.env` file in the root directory of your project and add the environment variables you want to use that you can config your own setting in the specific project.

```bash
1CHOOO_DOMAIN_NAME=https://1chooo.com
```

Then, you can use the `load_dotenv()` function to load the environment variables from the `.env` file.

```python
from dotenv import load_dotenv
import os

load_dotenv()

# access environment variable
print(f"1chooo Domain Name: {os.getenv('1CHOOO_DOMAIN_NAME')}")
```

result:

```bash
1chooo Domain Name: https://1chooo.com
```

That's it! You now know three methods to access environment variable values in Python. You can use the `os.environ` property, the `os.getenv()` method, or the `python-dotenv` package to access environment variables in your Python applications.

## Additional Resources

For more details and to explore the access environment variable values in Python further, feel free to check out these resources:

- [Access environment variable values in Python](https://www.geeksforgeeks.org/access-environment-variable-values-in-python/)
