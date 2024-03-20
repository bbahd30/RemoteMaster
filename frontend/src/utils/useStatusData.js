import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStatusData } from "../Slices/parameterSlice";

const useStatusData = () => {
	const dispatch = useDispatch();
	const parameterIDsList = useSelector(
		(state) => state.parameter?.parameterIDsList
	);
	const selectedID = useSelector((state) => state.test.selectedID);
	const [overallStatus, setOverallStatus] = useState(null);

	useEffect(() => {
		let allInRanges = true;
		let data = [];
		parameterIDsList?.forEach((param) => {
			console.log(param);
			const status =
				param.value < param.lower_bound
					? -1
					: param.value > param.upper_bound
					? 1
					: 0;

			if (status !== 0) allInRanges = false;

			data.push({ paramID: param.id, testID: selectedID, status });
		});

		dispatch(getStatusData(data));
		setOverallStatus(
			allInRanges
				? "All parameters within range"
				: "Some parameters out of range"
		);
	}, [parameterIDsList, dispatch, selectedID]);

	return overallStatus;
};

export default useStatusData;
