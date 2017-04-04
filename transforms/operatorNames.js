export default function (fileInfo, { jscodeshift: j }, api) {
  const renames = {
    onNext: 'next',
    onCompleted: 'complete',
    onError: 'error',
    dispose: 'unsubscribe',
    amb: 'race',
    bufferWithCount: 'bufferCount',
    bufferWithTime: 'bufferTime',
    selectMan: 'flatMap',
    flatMapFirst: 'exhaustMap',
    flatMapLatest: 'switchMap',
    flatMapWithMaxConcurrent: 'mergeMap',
    fromCallback: 'bindCallback',
    fromNodeCallback: 'bindNodeCallback',
    publishValue: 'publishBehavior',
    replay: 'publishReplay',
    return: 'of',
    just: 'of',
    select: 'map',
    selectConcat: 'concatMap',
    switchFirst: 'exhaust',
    tap: 'do',
    windowWithTime: 'windowTime',
    windowWithCount: 'windowCount',
    where: 'filter'
  };

  return j(fileInfo.source)
    .find(j.MemberExpression)
    .forEach(p => {
      const pName = p.value.property.name;
      if (renames[pName]) {
        p.value.property.name = renames[pName];
      }
    }).toSource();
};

