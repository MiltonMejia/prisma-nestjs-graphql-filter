export function GetFields(prismaEnum: { [key: string]: string }) {
	return Object.keys(prismaEnum);
}
