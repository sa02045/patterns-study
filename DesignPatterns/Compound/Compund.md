# Compound 패턴
Compound: 화합물, 합성어, 혼합물

- pattern 사이트) 하나의 작업을 위해 여러 컴포넌트를 만들어 역할을 분담하게 한다
- 일반적인 패턴으로서) 디자인 패턴이 혼합된 디자인 패턴
  
## 예시) select

- 짝꿍없이는 동작하지 않으며 의미가 없다!

```html
<select>
  <option value="value1">key1</option>
  <option value="value2">key2</option>
  <option value="value3">key3</option>
</select>

// 짝꿍없이 단독으로 작동하는 API를 사용하려면?

<select options="key1:value1;key2:value2;key3:value3"></select>
```



