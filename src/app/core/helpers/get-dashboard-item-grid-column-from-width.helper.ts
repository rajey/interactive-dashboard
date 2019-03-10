export function getDashboardItemGripColumnFromWidth(
  dashboardItemWidth: number
): string {
  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  console.log(windowWidth, dashboardItemWidth);
  return 'span 4';
}
