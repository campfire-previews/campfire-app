const SUBDOMAIN = import.meta.env.VITE_SUBDOMAIN;
const USER_DOMAIN = import.meta.env.VITE_USER_DOMAIN;

function Preview({ repo, issue_number }) {
  const previewAppLink = `https://${repo}-${issue_number}.${SUBDOMAIN}.${USER_DOMAIN}`;
  return <iframe src={previewAppLink} title="Preview"></iframe>;
}

export default Preview