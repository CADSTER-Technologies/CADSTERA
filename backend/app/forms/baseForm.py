class BaseForm:
    def __init__(self, data: dict):
        self.data = data
        self._validation_errors = {}

    @staticmethod
    def run_validators(value, validators):
        for validator in validators:
            error = validator(value)
            if error:
                return error
        return None

    async def validate(self):
        self._validation_errors = {}

        for field_name, validators in getattr(self, "fields", {}).items():
            value = self.data.get(field_name)
            error = self.run_validators(value, validators)
            if error:
                self._add_error(field_name, error)

        return self._validation_errors

    def _add_error(self, field, message):
        if field not in self._validation_errors:
            self._validation_errors[field] = []
        self._validation_errors[field].append(message)

    async def has_errors(self):
        errors = await self.validate()
        return bool(errors)

    def get_validation_errors(self):
        return self._validation_errors
