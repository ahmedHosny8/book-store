/* eslint-disable react/prop-types */
import { Form, useActionData, useNavigation } from 'react-router-dom';

function UpdateUserData({ userData, setShowEdit }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const actionData = useActionData();
  //console.log(actionData);

  return (
    <div className="flex items-center p-4 md:h-80">
      <Form method="PATCH" className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-poppins font-medium text-sm">Username</label>
          <div>
            <input
              className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
              type="text"
              name="username"
              defaultValue={userData.data.user.username}
              required
            />
          </div>
          {actionData?.username && (
            <p className="font-poppins text-sm text-red-500">
              {actionData.username}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-poppins font-medium text-sm">Email</label>
          <div>
            <input
              className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
              // type="email"
              name="email"
              defaultValue={userData.data.user.email}
              required
            />
          </div>
          {actionData?.email && (
            <p className="font-poppins text-sm text-red-500">
              {actionData.email}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-end gap-6">
          <input type="hidden" name="actionType" value="updateUserData" />

          <button
            className="text-base text-gray-600 hover:text-gray-700 hover:underline"
            onClick={() => setShowEdit(false)}
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

export default UpdateUserData;
