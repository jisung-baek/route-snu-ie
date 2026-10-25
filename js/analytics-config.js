// ─── PostHog 연결 설정 ────────────────────────────────────────────────────────
// 아래 키는 PostHog의 공개 project token이다. 비밀값이 아니다 — PostHog 문서가
// 공개되어도 안전하다고 명시한다. write-only라 수집된 데이터를 읽을 수 없고,
// 어차피 배포된 JS에 실려 브라우저에 노출된다. 이 파일 분리는 보안 조치가
// 아니라 설정과 로직을 나눈 것뿐이다. (절대 노출하면 안 되는 건 personal key,
// 즉 phx_ 로 시작하는 쪽이다.)
//
// 토큰을 가진 사람은 다른 사이트에서도 이벤트를 보낼 수 있고, 이를 막는
// 도메인 설정은 PostHog에 없다. 피해는 데이터 오염뿐이며(유출 아님), 실제로
// 오염되면 토큰을 재발급하면 된다. 숫자를 깨끗하게 보려면 쿼리에서 $host로
// 거르면 된다.
//
// 이 파일을 지우거나 posthogKey를 비우면 js/analytics.js가 조용히 비활성화된다
// (사이트 동작에는 영향 없음). 로컬에서 수집을 끄고 싶을 때 그렇게 쓰면 된다.

window.ROUTE_SNU_IE_ANALYTICS = {
  posthogKey: "phc_nwmdJJVi7TSoxXRputpDyLUicQv6QzXtrZar2tSepFpz",
  posthogHost: "https://us.i.posthog.com"
};
