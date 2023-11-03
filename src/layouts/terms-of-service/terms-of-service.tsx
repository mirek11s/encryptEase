import Navbar from "layouts/components/navbar/navbar";
import "./terms-of-service.css";

const TermsOfService = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Terms of Service</h2>
        <p className="mb-2 tos-paragraph">
          <strong>1. Demo Application:</strong> Please be aware that this
          platform serves as a demonstration and does not assure the enduring
          protection of the files you upload.
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>2. User Discretion:</strong> The application is in its beta
          phase. We encourage users to exercise caution and utilize the app at
          their own discretion.
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>3. Control over Files:</strong> As the proprietor of this
          project, I reserve the right to modify, delete, or alter any uploaded
          files as deemed necessary. We kindly advise against uploading
          classified or personal files.
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>4. Encryption Methods:</strong> The project explores a variety
          of file encryption techniques, including a custom experimental
          cryptographic method. The security of these methods may not be fully
          established.
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>5. User Agreement:</strong> By using this application, you
          acknowledge and agree to the terms stated above and use the app at
          your own risk.
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>8. Limitation of Liability:</strong> We are not liable for any
          damages or losses resulting from the use of this application.
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>9. Changes to Terms:</strong> The Terms of Service may be
          updated periodically. Continued use signifies acceptance of these
          changes.
        </p>
        <p className="mb-2 tos-paragraph">
          <strong>11. Disclaimer:</strong> The app is provided "as is" without
          any warranties or guarantees.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
