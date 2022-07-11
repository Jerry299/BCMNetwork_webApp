import { Select } from "antd";
import "antd/dist/antd.css";

export const FormDropDown = ({
	options,
	placeholder,
	label,
	loading,
	onChange,
	className,
}) => {
	return (
		<div className={`dropdown-container ${className}`}>
			{label && <span className="dropdown-label">{label}</span>}
			<div className="p-relative">
				<Select
					size="large"
					loading={loading}
					placeholder={placeholder}
					onChange={onChange}
					className={className}
				>
					{options?.map((option, idx) => (
						<Select.Option value={option} key={idx}>
							{option}
						</Select.Option>
					))}
				</Select>
			</div>
		</div>
	);
};
