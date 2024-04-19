const SUBDOMAIN = import.meta.env.VITE_SUBDOMAIN;
const USER_DOMAIN = import.meta.env.VITE_USER_DOMAIN;

function Preview({ repo, issue_number, iFrameRef }) {
  const previewAppLink = `https://${repo}-${issue_number}.${SUBDOMAIN}.${USER_DOMAIN}`;
  // const previewAppLink = "http://localhost:5173";
  return (
    <iframe
      id="Preview"
      ref={iFrameRef}
      src={previewAppLink}
      title="Preview"
    ></iframe>
  );
}

export default Preview;
