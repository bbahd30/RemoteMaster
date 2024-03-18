import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBounds, getValue, setFoundBound } from "../Slices/parameterSlice";

const useGenerateParaValues = () => {
	const dispatch = useDispatch();
	const parameterIDsList = useSelector(
		(state) => state.parameter?.parameterIDsList
	);
	const bookingID = useSelector((state) => state.booking.selectedBooking);
	const boundFound = useSelector((state) => state.parameter.boundFound);
	const testID = useSelector((state) => state.test.selectedID);

	useEffect(() => {
		if (!boundFound && testID && parameterIDsList?.length > 0) {
			parameterIDsList?.forEach((param) => {
				dispatch(
					getBounds({
						id: param.id,
						name: param.name,
						testID: testID,
					})
				);
				if (bookingID)
					dispatch(getValue({ id: param.id, bookingID: bookingID }));
			});
			dispatch(setFoundBound(true));
		}
	}, [parameterIDsList, boundFound, testID, bookingID, dispatch]);
};

export default useGenerateParaValues;
