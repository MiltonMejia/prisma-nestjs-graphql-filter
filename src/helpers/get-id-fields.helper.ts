export function GetIdFields(prismaEnum: { [key: string]: string }) {
	return Object.keys(prismaEnum).filter((item) => item.includes('_id') || item === 'id');
}
