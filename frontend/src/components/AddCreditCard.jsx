/* eslint-disable react/prop-types */
import { Form, useActionData, useNavigation } from 'react-router-dom';

function AddCreditCard({ setShowAddCreditCard }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const actionData = useActionData();
  //console.log(actionData);

  return (
    <div className="py-8">
      <Form method="POST" className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-poppins font-medium text-sm">
            Card Number
          </label>
          <div>
            <input
              className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
              type="text"
              name="cardNumber"
              required
            />
          </div>
          {actionData?.cardNumber && (
            <p className="font-poppins text-sm text-red-500">
              {actionData.cardNumber}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-poppins font-medium text-sm">
            Card Holder Name
          </label>
          <div>
            <input
              className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
              type="text"
              name="cardholderName"
              required
            />
          </div>
          {actionData?.cardholderName && (
            <p className="font-poppins text-sm text-red-500">
              {actionData.cardholderName}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-poppins font-medium text-sm">
            Expiry Date
          </label>
          <div>
            <input
              className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
              type="text"
              name="expiryDate"
              required
            />
          </div>
          {actionData?.expiryDate && (
            <p className="font-poppins text-sm text-red-500">
              {actionData.expiryDate}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-end gap-6">
          <input type="hidden" name="actionType" value="addCreditCard" />

          <button
            className="text-base text-gray-600 hover:text-gray-700 hover:underline"
            onClick={() => setShowAddCreditCard(false)}
          >
            Cancel
          </button>
          <button
            className="text-base text-blue-500 hover:text-blue-600 hover:underline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AddCreditCard;
