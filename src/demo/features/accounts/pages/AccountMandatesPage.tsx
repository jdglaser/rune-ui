import { getRouteApi } from "@tanstack/react-router";

const mandatesRoute = getRouteApi("/accounts/$accountId/mandates");

export function AccountMandatesPage() {
  const { accountId } = mandatesRoute.useParams();

  return (
    <section aria-labelledby="mandates-heading">
      <h4 id="mandates-heading">Mandates for {accountId}</h4>
      <p>Mandate data will be introduced in a later lesson.</p>
    </section>
  );
}
