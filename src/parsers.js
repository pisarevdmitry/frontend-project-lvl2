import yaml from 'js-yaml';

const parseJson = (file) => JSON.parse(file);
const parseYaml = (file) => yaml.load(file);

const parsers = {
  json: parseJson,
  yaml: parseYaml,
  yml: parseYaml,
};

export default (file, ext) => parsers[ext](file);
