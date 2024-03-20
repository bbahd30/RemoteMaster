import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParameterIDs } from "../Slices/parameterSlice";

const useGetParaIDs = () => {
	const dispatch = useDispatch();
	const test = useSelector((state) => state.test.selectedTest);
	const paramsList = useSelector((state) => state.parameter.parametersList);
	const parameters = test?.parameters || paramsList;

	useEffect(() => {
		let params = [];
		parameters?.map((param) => {
			let value = {
				id: param.ID,
			};
			params.push(value);
		});
		if (params?.length > 0) {
			dispatch(setParameterIDs(params));
		}
	}, [test]);
};

export default useGetParaIDs;
