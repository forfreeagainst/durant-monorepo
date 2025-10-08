function toValidPackageName(projectName) {
  return /^[a-z]+(-[a-z]+)?$/.test(projectName);
}

export default toValidPackageName;