const useModifyUrl = () => {
  const getlink = (link: string, width?: number, height?: number) => {
    const urlParts = link?.split("/");
    const versionIndex = urlParts?.findIndex((part: string) =>
      part?.startsWith("v")
    );

    if (versionIndex) {
      const modifiedUrl = `${urlParts.slice(0, versionIndex).join("/")}/${
        height ? `h_${height}` : ""
      }${width && height ? "," : ""}${width ? `w_${width}` : ""}/${urlParts
        .slice(versionIndex)
        .join("/")}`;
      return modifiedUrl;
    }
  };
  return { getlink };
};

export default useModifyUrl;
