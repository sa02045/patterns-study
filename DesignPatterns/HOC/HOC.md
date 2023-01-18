# High Order Component (고차컴포넌트)

- 컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수
- 원본 컴포넌트를 Wrapping, Compose 하여 새로운 컴포넌트를 반환한다.
- 원본 컴포넌트를 변경하지 않는다. 사이드 이펙트가 없는 순수 함수이다.
- Container - Presentational 패턴과 비슷한 면이 있다.
- 재사용성 증가, 중복 줄이기

## 횡단 관심사란?
- 어플리케이션 각 계층에서 공통적으로 필요한 문제
- 쉽게 정리하면 `공통 관심사`

### 조합 가능성(Composability) 끌어올리기

- 고차 컴포넌트는 여러가지 방법으로 작성할 수 있다.

단일 인수
```js
const NavbarWithRouter = withRouter(Navbar);
```

단일 인수 + 추가 인수(설정값)
```js
const CommentWithRelay = Relay.createContainer(Comment, config);
```

복잡한 경우
```js
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

// 해체해보면 - 커링 기법과 비슷?
const enhance = connect(commentListSelector, commentListActions);
const ConnectedComment = enhance(CommentList);
```


### 로깅 고차 컴포넌트
- 어떤 컴포넌트가 가장 많이 유저들에게 사용되는지 로그를 남기는 고차 컴포넌트를 만들어보자
  - 컴포넌트가 mount 될 때 로그를 남긴다.
  - 버튼 컴포넌트를 클릭 할 때 로그를 남긴다.
- 이름 규칙: with으로 시작해야한다.
```js
function withLogging(WrappedComponent){

    // 클로저
    function log(message) {
        console.log(WrappedComponent, message)
    }

    return class extends React.Component{
        componentDidMount() {
            this.log("마운트")
        }

        render(){
            // 컴포넌트에 추가로 props를 내려주는 것에 주목
            const enhancedProps = { log }
            return <WrappedComponent {...this.props} {...enhancedProps} />
        }
    }
}



////////////////////////////////////////////


const Header = () => <header>Header</header>

// 추가로 내려받은 props
const Button ({log}) => {
  const handleClick = () => log("클릭");
  return <button onClick={handleClick}>클릭</button>;
}

const EnhancedHeader = withLogging(Header) // Header 마운트
const EnhancedButton = withLogging(Button) // Button 마운트, Button 클릭
```

## 주의사항
### 리액트 render() 함수내에서 컴포넌트를 정의하지 않는다.
```js
// BAD
render() {
  class MyComponent extends React.Component {/* ... */}

  return <MyComponent/>
}
```

- render 함수는 경우에 따라 여러 번 호출될 수 있다.
- 만약 render 함수안에 컴포넌트를 정의한다면, 렌더 함수가 호출할 때마다 새로운 컴포넌트를 생성하게 된다.
- 컴포넌트의 상태가 초기화되기 때문에 UI가 원하는대로 동작하지 않는다.

고차 컴포넌트도 마찬가지로 render() 함수 내부에서 정의하면 안된다.

```js
// BAD
render() {
  const EnhancedButton = withLogging(Button);
  return (
    <>
      <EnhancedHeader />
      <EnhancedButton />
    </>
  )
}

// GOOD
// 바깥에서 고차컴포넌트를 생성하는 함수를 사용한다.
const EnhancedButton = withLogging(Button);

function ....
render() {
  return (
    <>
      <EnhancedHeader />
      <EnhancedButton />
    </>
  )
}
```

### 그외 주의점
- 컴포넌트의 정적메서드는 HOC에서 사용할 수 없다. 복사해서 사용하자
- ref는 전달되지 않느다.

참고)
- https://jeonghwan-kim.github.io/2022/05/28/react-high-order-component