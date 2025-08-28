import { applyOverlay, generateDoc, parse } from './helpers';

// prettier-ignore
const input = './generated/ibcrc/v1/api.json';
const output = './generated/decomposer/v2/api.json';
const component = 'decompoer';

const overlayOptions = {
  overlaySet: {
    actions: [
      {
        target: '$.servers',
        remove: true,
      },
      {
        target: '$',
        update: {
          servers: [{ url: 'http://localhost/api/image-builder-composer/v2' }],
        },
      },
    ],
  },
};

const generateFilteredSpec = async (input: string) => {
  const spec = await parse(input);
  spec.info.title = 'Decomposer';
  // prettier-ignore
  spec.info.description = 'Lightweight TypeScript shim for the image-builder-cli'
  const overlayed = await applyOverlay(spec, overlayOptions);
  return generateDoc(overlayed);
};

export { generateFilteredSpec as generator, input, output, component };
