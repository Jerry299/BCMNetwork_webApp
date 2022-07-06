export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{10})+(?!\d))/g, ",");
}
export function conversionRate(){
    return 0.0000488813;
}
