## 잡학 사전

-   babel/preset-env: smart preset 최신 자바스크립트 사용 가능

-   babel-node: node 대신 쓸 수 있음

-   status code: 200(성공), 201(리소스 생성 성공)

## express

-   라우터: 엔드포인트와 해당 엔드포인트에서 실행돼야 할 로직을 연결해주는 역할

-   컨트롤러: 미들웨어의 일종이지만 메인 로직을 담당하므로 분리해서 관리

-   미들웨어: 메인 로직의 컨트롤러 앞뒤로 추가적인 일을 담당

-   app.use(): 모든 routes의 response 전에 동작하는 공통 미들웨어(예시: morgan, cors(CORS 에러 해결))

-   express.Router().route("url").get().post()...

```js
app.use(express.urlencoded({ extended: true }));
```

-   application/x-www-form-urlencoded 방식이면 -> false

-   application/x-www-form-urlencoded 방식이 아닌 다른 인코딩 방식이라면 -> true

## REST API

/posts -> 모든 계시글
/posts/

## Mysql

-   mysql2는 mysql과 nodejs 프로젝트를 연결해주는 드라이버이다.

-   Connection은 동시에 여러 쿼리문을 처리하지 못하지만, Pool은 동시에 여러 쿼리문을 병렬적으로 처리할 수 있다.

-   .env를 사용할 땐 dotenv 모듈을 다운 받아 사용하려는 곳에 다음 코드를 실행하자

-   sequelize: ORM library(Obect-Relational Mapping library)로, sql를 javascript 객체로 매핑해 sql 코드를 (대신) 실행하는 편리한 메서드를 제공

```js
dotenv.config();
```

## multer

-   각각 다른 file input을 동일한 form에서 받는다면 `fields({name:string; maxCount:number;}[])` 메서드를 사용하자(하나라면 `single("name")`)

-   다음 컨트롤러에서 `req.files` 혹은 `req.file`로 확인한다.

## AWS

### S3: 스토리지 서비스

-   public read 활성화하기: 퍼블릭 엑세스 차단에서 밑 2개 활성화 + (객체 소유권->ACL 활성화됨)

### IAM: AWS 리소스에 대한 접근 관리

-   프로젝트와 리소스 연결하기: 사용자 => 기존 정책 직접 연결(ex: S3fullaccess) => ID, SECRET(이후에 확인 못함)을 .env에 기록 후 함꼐 사용
