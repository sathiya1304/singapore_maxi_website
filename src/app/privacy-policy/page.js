import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-fit bg-gray-100 flex items-center justify-center">
      <div className="my-6 max-w-7xl mx-auto px-4 w-full rounded-lg p-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <a
            href="/"
            className="text-sm font-semibold text-black bg-[#FFBF34] px-4 py-2 rounded-full"
          >
            Back to Home
          </a>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-700">Payment Methods:</h2>
            <p className="text-gray-600">
              Offers payment options such as credit cards, cash payments.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-700">Waiting Time Charges:</h2>
            <p className="text-gray-600">
              After the first 15 minutes, charges may apply for every 10 minutes 10$.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-700">Cancellation Policies:</h2>
            <p className="text-gray-600">
            Cancellation should be done before 2 hours, else one half of the booking fee will be charged.     
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-700">Other Terms & Conditions:</h2>
            <p className="text-gray-600">
              Clients are responsible for any damage to the vehicle and are not permitted to smoke, drink alcohol, or eat food in the vehicle.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
