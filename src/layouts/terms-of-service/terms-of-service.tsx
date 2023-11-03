import { useTranslation } from "react-i18next";
import Navbar from "layouts/components/navbar/navbar";
import "./terms-of-service.css";

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">{t("tos")}</h2>
        <p className="mb-2 tos-paragraph">
          <strong>1. {t("tos-rule-1-subheader")}: </strong>
          {t("tos-rule-1-text")}
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>2. {t("tos-rule-2-subheader")}: </strong>
          {t("tos-rule-2-text")}
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>3. {t("tos-rule-3-subheader")}: </strong>
          {t("tos-rule-3-text")}
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>4. {t("tos-rule-4-subheader")}: </strong>
          {t("tos-rule-4-text")}
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>5. {t("tos-rule-5-subheader")}: </strong>
          {t("tos-rule-5-text")}
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>6. {t("tos-rule-6-subheader")}: </strong>
          {t("tos-rule-6-text")}
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>7. {t("tos-rule-7-subheader")}: </strong>
          {t("tos-rule-7-text")}
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>8. {t("tos-rule-8-subheader")}: </strong>
          {t("tos-rule-8-text")}
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
