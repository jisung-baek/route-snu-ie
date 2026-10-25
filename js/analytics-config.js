// ─── PostHog 연결 설정 ────────────────────────────────────────────────────────
// 아래 키는 PostHog의 공개 ingest key다. 비밀값이 아니며, 어떻게 관리하든
// 배포된 사이트의 JS에 실려 브라우저에 노출된다 — 이 파일을 숨기는 것은
// 보호 수단이 아니다.
//
// 실제 보호는 PostHog 쪽 설정으로 한다:
//   Project settings → Authorized domains → route-snu-ie.vercel.app 만 허용
// 이걸 걸어두지 않으면 남이 키를 가져다 다른 사이트에서 이벤트를 쏠 수 있어
// 수집 데이터가 오염된다.
//
// 이 파일을 지우거나 posthogKey를 비우면 js/analytics.js가 조용히 비활성화된다
// (사이트 동작에는 영향 없음). 로컬에서 수집을 끄고 싶을 때 그렇게 쓰면 된다.

window.ROUTE_SNU_IE_ANALYTICS = {
  posthogKey: "phc_nwmdJJVi7TSoxXRputpDyLUicQv6QzXtrZar2tSepFpz",
  posthogHost: "https://us.i.posthog.com"
};
