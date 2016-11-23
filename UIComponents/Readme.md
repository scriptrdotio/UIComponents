To run the tests for httpProvider and wsProvider

- Files needs to be anonymous.
- Create 2 channels:
    - "requestChannel"
    - "responseChannel"
Both channels should be anonymous subscribe/publish

- Set ur anonymous token in both files 
    - UIComponents/tests/wsProvider/test.html
    - UIComponents/tests/httpProvider/test.html
    
As follow:
`
  wsClientProvider.setToken(<<YOUR_ANON_TOKEN>>);
`

Click on view for the both test.html files to run the tests.
