/**
 *
 * @param {type = number} r = 빨강 계열의 농도 숫자(높을수록 진함)
 * @param {type = number} g = 초록 계열의 농도 숫자(높을수록 진함)
 * @param {type = number} b = 파랑 계열의 농도 숫자(높을수록 진함)
 * @returns 각 RGB로 이루어진 색깔 계열의 10진수 숫자들을 16진수로 바꾸어 HEX표기로 변환.
 */
export default function parseToHEX(r, g, b) {
	if (r > 255 || g > 255 || b > 255) throw "Over the rgb state.";
	return ((r << 16) | (g << 8) | b).toString(16);
}
