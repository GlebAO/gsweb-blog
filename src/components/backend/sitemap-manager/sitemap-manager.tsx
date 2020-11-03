import React, { useContext, useState } from "react";
import { BlogServiceContext } from "../../../context";

const SitemapManager = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const blogService = useContext(BlogServiceContext);

  function handleUpdateSitemap() {
    setSending(true);
    blogService!
      .updateSitemap()
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setTimeout(() => {
          setSending(false);
          setError(null);
          setSuccess(false);
        }, 1000);
      });
  }

  return (
    <div className="card">
      <div className="card-header">Управление картой сайта</div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error.message}</div>}
        {success && (
          <div className="alert alert-success">Успешно обновлено</div>
        )}
        <button
          className="btn btn-primary"
          disabled={sending}
          onClick={handleUpdateSitemap}
        >
          Обновить sitemap.xml
        </button>
      </div>
    </div>
  );
};

export default SitemapManager;
