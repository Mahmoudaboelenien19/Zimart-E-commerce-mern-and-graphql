const useModifyUrl = (link: string, type?: string) => {
  const width = type === "phone" ? 1400 : 1400;
  const height = type === "phone" ? 1400 : 1400;

  const urlParts = link?.split("/");
  const versionIndex = urlParts?.findIndex((part: string) =>
    part?.startsWith("v")
  );

  if (versionIndex) {
    const modifiedUrl = `${urlParts
      .slice(0, versionIndex)
      .join("/")}/w_${width},h_${height}/${urlParts
      .slice(versionIndex)
      .join("/")}`;
    return modifiedUrl;
  } else return "";
};

export default useModifyUrl;
