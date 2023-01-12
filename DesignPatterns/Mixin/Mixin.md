# 믹스인 패턴

- 자바스크립트뿐만 아니라 객체 지향 언어에서 범용적으로 쓰이는 용어
- 다른 클래스의 부모클래스가 되지 않으면서 다른 클래스에서 사용할 수 있는 메서드를 포함하는 클래스
- 코드 재사용성을 높인다

## vue mixin 명명 규칙
https://v2.vuejs.org/v2/style-guide/?redirect=true#Private-property-names-essential 


- $_ 접두사 사용해서 믹스인 함수임을 표시하기 (믹스인은 추적이 어려움)

```js
var HelloMixins = {
  methods: {
    $_myGreatMixin_update: function () {
    }
  }
}

new Vue({
  mixins: [HelloMixins],
  methods: {
    something:{
        $_myGreatMixin_update()
    }
  }
})
```



## React mixin
리액트에서 믹스인 패턴은 거의 사용하지 않는다. (https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

단점이 명확하고 대체제가 있기 때문이다. (hooks)

## 믹스인의 단점
- 이름 충돌: mixin이 실수로 기존 메서드를 덮어쓰면 충돌이 발생할 수 있습니다
- 추적이 어려움: 

