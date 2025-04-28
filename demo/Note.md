### **🚀 `@RestController` vs `@Controller` 差異解析**

在 **Spring Boot** 中，`@RestController` 和 `@Controller` 都是 **Spring MVC** 的註解，負責處理 **HTTP 請求**。但它們的行為有關鍵差異：

| 註解                  | 用途                           | 回傳類型                                             | 適用場景                                                               |
| --------------------- | ------------------------------ | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| **`@Controller`**     | **用來返回 HTML 頁面（視圖）** | 回傳 **Thymeleaf / JSP** 等視圖（不會直接回傳 JSON） | 適合用在 **前後端結合的 Web 應用**                                     |
| **`@RestController`** | **用來返回 JSON（或純文字）**  | 直接回傳 `String` / `JSON` / `Object`                | 適合用在 **純後端 API，前端用 Vue / React / Android / iOS 來消費 API** |

---

## **1️⃣ `@Controller`（回傳 HTML 頁面）**

**用於傳回 `templates/` 內的 `.html` 檔案，例如使用 Thymeleaf 或 JSP。**

🔹 **範例：回傳 HTML 頁面**

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller  // ✅ 回傳 HTML
public class GreetingController {

    @GetMapping("/greeting")
    public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name, Model model) {
        model.addAttribute("name", name);  // ✅ 把 name 變數傳給 Thymeleaf
        return "greeting";  // ✅ 返回 greeting.html
    }
}
```

🔹 **對應的 Thymeleaf 頁面（`src/main/resources/templates/greeting.html`）：**

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <head>
        <meta charset="UTF-8" />
        <title>Greeting Page</title>
    </head>
    <body>
        <h1>Hello, <span th:text="${name}">User</span>!</h1>
    </body>
</html>
```

🔹 **結果**

-   訪問 `http://localhost:8080/greeting?name=Alice`
-   瀏覽器會顯示：
    ```
    Hello, Alice!
    ```
-   **Spring Boot 會自動找到 `templates/greeting.html` 並渲染頁面**。

---

## **2️⃣ `@RestController`（回傳 JSON / 純文字）**

**適用於 RESTful API，通常用來返回 JSON 給前端或其他服務。**

🔹 **範例：回傳 JSON**

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController  // ✅ 會直接回傳 JSON 或字串
public class GreetingRestController {

    @GetMapping("/api/greeting")
    public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name) {
        return "Hello, " + name + "!";  // ✅ 直接回傳字串，不是 HTML 頁面
    }
}
```

🔹 **結果**

-   訪問 `http://localhost:8080/api/greeting?name=Alice`
-   瀏覽器會直接顯示：
    ```
    Hello, Alice!
    ```
    **（而不是返回 `greeting.html`）**
-   這種方式適合前端 **(React, Vue, Angular, iOS, Android)** 來調用 API。

🔹 **範例：回傳 JSON**

```java
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingJsonController {

    @GetMapping("/api/greetingJson")
    public Map<String, String> greetingJson(@RequestParam(name = "name", required = false, defaultValue = "World") String name) {
        return Map.of("message", "Hello, " + name + "!");  // ✅ 直接回傳 JSON
    }
}
```

🔹 **結果**

-   訪問 `http://localhost:8080/api/greetingJson?name=Alice`
-   瀏覽器會顯示：
    ```json
    {
        "message": "Hello, Alice!"
    }
    ```
-   這就是 **典型的 REST API 回應格式**，適合 **前端與後端分離架構**。

---

## **3️⃣ `@Controller` vs `@RestController`**

**📌 主要差異：**
| | `@Controller` | `@RestController` |
|---|-------------|----------------|
| **回傳類型** | **HTML 頁面**（如 `Thymeleaf`、`JSP`） | **JSON / 純文字** |
| **是否自動解析為 JSON** | ❌ **不會**，需要 `@ResponseBody` | ✅ **預設返回 JSON** |
| **適用場景** | **傳統 Web 應用**（後端渲染頁面） | **REST API**（前後端分離，返回 JSON 給前端） |

---

## **🚀 `@Controller` + `@ResponseBody`**

如果你想在 `@Controller` 中返回 JSON，而不是 HTML，**可以加上 `@ResponseBody`**：

```java
@Controller
public class MyController {

    @GetMapping("/json")
    @ResponseBody  // ✅ 讓 @Controller 回傳 JSON，而不是 HTML
    public Map<String, String> getJson() {
        return Map.of("message", "Hello, JSON!");
    }
}
```

🔹 **效果**
這與 `@RestController` **完全相同**，但 `@RestController` 是 **`@Controller` + `@ResponseBody` 的簡寫**。

---

## **🔹 結論**

| **場景**                                         | **應該用 `@Controller` 還是 `@RestController`？** |
| ------------------------------------------------ | ------------------------------------------------- |
| **要回傳 HTML（如 `Thymeleaf` 或 JSP）**         | `@Controller`                                     |
| **要回傳 JSON / 純文字**                         | `@RestController`                                 |
| **前端是 Vue / React / Angular，要後端提供 API** | `@RestController`                                 |
| **前端是 JSP / Thymeleaf，要回傳動態 HTML**      | `@Controller`                                     |

---

## **🎯 總結**

| 註解              | 用途                         | 回傳類型            | 適用場景          |
| ----------------- | ---------------------------- | ------------------- | ----------------- |
| `@Controller`     | **處理 Web 請求，返回 HTML** | **Thymeleaf / JSP** | **傳統 MVC 應用** |
| `@RestController` | **處理 Web 請求，返回 JSON** | **JSON / 純文字**   | **REST API 應用** |

### 🚀 **使用規則**

✅ **`@Controller`** **→ 回傳 `templates/` 內的 `.html` 頁面**  
✅ **`@RestController`** **→ 回傳 JSON 給前端（如 React/Vue）**

如果你要 Thymeleaf 頁面，請使用 `@Controller`，**不要用 `@RestController`**！🔥
