export default defineEventHandler((event) => {
  event.context.auth = { user: 123 };
});
// TODO: Probably delete