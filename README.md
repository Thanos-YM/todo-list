# Todo List

심플하고 직관적인 웹 기반 투두리스트 애플리케이션입니다.

## 주요 기능

- 노션 스타일의 체크박스와 인라인 편집
- 엔터키로 새 항목 추가
- 백스페이스로 빈 항목 삭제
- 체크 시 취소선 및 회색 처리
- 개별 항목 삭제 (휴지통 아이콘)
- 전체 초기화 버튼
- 로컬 저장소 자동 저장 (새로고침해도 데이터 유지)

## 사용 방법

### 바로 사용
https://thanos-ym.github.io/todo-list/

### 로컬에서 실행

1. 저장소 클론
    ```
    git clone https://github.com/Thanos-YM/todo-list.git
    ```

2. 의존성 설치
    ```
    npm install
    ```

3. 개발 서버 실행
    ```
    npm start
    ```

4. 브라우저에서 http://localhost:3000 접속

## 키보드 단축키

- `Enter`: 새 항목 추가
- `Backspace` (빈 항목에서): 현재 항목 삭제

## 기술 스택

- React 19.2.0
- CSS3
- localStorage (데이터 저장)

## 배포
```bash
npm run deploy
```

GitHub Pages로 자동 배포됩니다.

## 라이선스

MIT License

## 개발자

manbron236