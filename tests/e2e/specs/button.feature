Feature: The play button
  The game will consist of a single button. The objective of the game is
  to click it as much as possible without over clicking it too much.
  Over clicking (pressing it more than 2 times in a second) leads us timed out
  and unable to get more points (the button will be disabled until the countdown
  finished).

  Scenario: I press the button once when its available
    # it should increase the game score
    # and temporarily increase the panic score
    When I click on the button
    Then The game score should increase by 10

  Scenario: I press the button 5 times in a second
    # the panic score should be 100 and stay there
    # until the countdown reaches 0
    When I click on the button 5 times fast
    Then The button should be disabled
    And The button should be available after 5 seconds

  Scenario: I press the button multiple times but slowly
    # since you're pressing slowly enough you may click
    When I click on the button 3 times slowly
    Then The button should be available
