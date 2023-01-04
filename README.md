## 잡학 사전

-   babel/preset-env: smart preset 최신 자바스크립트 사용 가능

-   babel-node: node 대신 쓸 수 있음

-   라우터: 엔드포인트와 해당 엔드포인트에서 실행돼야 할 로직을 연결해주는 역할

-   컨트롤러: 미들웨어의 일종이지만 메인 로직을 담당하므로 분리해서 관리

-   미들웨어: 메인 로직의 컨트롤러 앞뒤로 추가적인 일을 담당

-   app.use(): 모든 routes의 response 전에 동작하는 공통 미들웨어(예시: morgan, cors(CORS 에러 해결))

-   status code: 200(성공), 201(리소스 생성 성공)

-   express.Router().route("url").get().post()...

## REST API

/posts -> 모든 계시글
/posts/
